import { Vector3 } from 'three';

// ---------------------------------------------------------------------------
// Camera flights: ease the camera position and the orbit target together,
// optionally bowing the camera outward so long trips read as "pull back,
// travel, push in" instead of sliding through the concrete.
// ---------------------------------------------------------------------------

export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export class Flight {
  constructor() {
    this.active = false;
    this.t = 0;
    this.duration = 1;
    this.arc = 0;
    this.ease = easeInOutCubic;
    this.onDone = null;
    this.p0 = new Vector3(); // camera from / to
    this.p1 = new Vector3();
    this.q0 = new Vector3(); // target from / to
    this.q1 = new Vector3();
    this.d0 = new Vector3(); // "backwards" view direction at both ends
    this.d1 = new Vector3();
    this._d = new Vector3();
  }

  /**
   * Begin a flight. `arc` is how far (world units) the camera is pulled back
   * along the view direction at mid-flight.
   */
  start(fromPos, fromTarget, toPos, toTarget, { duration = 1.6, arc = 0, ease = easeInOutCubic, onDone = null } = {}) {
    this.p0.copy(fromPos);
    this.q0.copy(fromTarget);
    this.p1.copy(toPos);
    this.q1.copy(toTarget);
    this.d0.subVectors(this.p0, this.q0);
    this.d1.subVectors(this.p1, this.q1);
    if (this.d0.lengthSq() < 1e-9) this.d0.set(0, 0, 1);
    if (this.d1.lengthSq() < 1e-9) this.d1.copy(this.d0);
    this.d0.normalize();
    this.d1.normalize();
    this.duration = Math.max(0.01, duration);
    this.arc = Math.max(0, arc);
    this.ease = ease;
    this.onDone = onDone;
    this.t = 0;
    this.active = true;
    return this;
  }

  /** Advance by dt seconds and write the pose into outPos / outTarget. Returns false when idle. */
  step(dt, outPos, outTarget) {
    if (!this.active) return false;
    this.t += dt;
    const k = Math.min(1, this.t / this.duration);
    const e = this.ease(k);
    outPos.lerpVectors(this.p0, this.p1, e);
    outTarget.lerpVectors(this.q0, this.q1, e);
    if (this.arc > 0) {
      const d = this._d.lerpVectors(this.d0, this.d1, e);
      if (d.lengthSq() < 1e-6) d.copy(this.d0);
      outPos.addScaledVector(d.normalize(), Math.sin(Math.PI * e) * this.arc);
    }
    if (k >= 1) {
      outPos.copy(this.p1);
      outTarget.copy(this.q1);
      this.active = false;
      const done = this.onDone;
      this.onDone = null;
      if (done) done();
    }
    return true;
  }

  cancel() {
    this.active = false;
    this.onDone = null;
  }

  get progress() {
    return this.active ? Math.min(1, this.t / this.duration) : 1;
  }
}
