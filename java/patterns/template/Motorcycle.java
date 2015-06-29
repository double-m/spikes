class Motorcycle extends Vehicle {

  protected void start() {
    System.out.println("Motorcycle started");
  }

  protected void accelerate() {
    System.out.println("Motorcycle getting fast!");
  }

  protected void turn(String side) {
    System.out.println("Motorcycle turning to " + side);
  }

  protected void decelerate() {
    System.out.println("Motorcycle loosing speed");
  }

  protected void stop() {
    System.out.println("Motorcycle stopped");
  }
}
