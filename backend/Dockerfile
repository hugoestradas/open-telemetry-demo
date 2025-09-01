FROM registry.access.redhat.com/ubi8/openjdk-17:latest

COPY target/quarkus-app/lib/ /deployments/lib/
COPY target/quarkus-app/*.jar /deployments/
COPY target/quarkus-app/app/ /deployments/app/
COPY target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"
