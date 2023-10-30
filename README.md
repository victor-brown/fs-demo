## CI/CD (optional)

> Write a short description of how would you deploy your solution in a cloud environment (AWS, Azure, GCP). What type of resources would you use and why?

In this example, I would prefer to leverage a serverless option, such as AWS Lambda functions or Google Cloud Functions.

For AWS specifically:

- I would configure a GitHub workflow to automate the deployment of the necessary files to AWS.
- Within AWS, I would require the following components:
  - An API Gateway, which serves as the trigger for the application.
    - It should have a POST endpoint for utilizing the **store** functionality.
    - It should also have a GET endpoint for accessing the **get** functionality.
  - A Lambda Function to manage the core logic of the application.

By adopting this approach, we can use the application without the need for a dedicated server or hosting infrastructure, and we only pay for the service based on actual usage.

Alternatively, we have the option to set up a traditional server and host the application on an EC2 instance.
