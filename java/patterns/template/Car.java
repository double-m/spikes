class Car extends Vehicle {

  protected void start() {
    System.out.println("Car started");
  }

  protected void accelerate() {
    System.out.println("Car getting fast!");
  }

  protected void turn(String side) {
    System.out.println("Car steering to " + side);
  }

  protected void decelerate() {
    System.out.println("Car loosing speed");
  }

  protected void stop() {
    System.out.println("Car stopped");
  }
}
