abstract class Vehicle {

  protected abstract void start();
  protected abstract void accelerate();
  protected abstract void turn(String side);
  protected abstract void decelerate();
  protected abstract void stop();

  public final void go() {
    start();
    accelerate();
    turn("left");
    turn("right");
    decelerate();
    stop();
  }
}
