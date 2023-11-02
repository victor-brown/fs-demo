## CI/CD (optional)

> Write a short description of how would you deploy your solution in a cloud environment (AWS, Azure, GCP). What type of resources would you use and why?

In this example, I would prefer to leverage a serverless option, such as AWS Lambda functions or Google Cloud Functions.

For AWS specifically:

- I would configure a GitHub workflow to automate the deployment of the necessary files to AWS.
- Within AWS, I would require the following components:
  - S3 bucket to store the files
  - An API Gateway, which serves as the trigger for the application.
    - It should have a POST endpoint for utilizing the **store** functionality.
    - It should also have a GET endpoint for accessing the **get** functionality.
  - A Lambda Function to manage the core logic of the application.

Upon receiving a POST request, the API gateway will initiate the Lambda function. This Lambda function is responsible for either storing new files in an S3 bucket or associating the provided filename with an existing hash in the system.

In the case of a GET request, the API gateway again triggers the Lambda function. This Lambda function's role is to search for an existing hash based on the provided filename. If the search is successful, the Lambda function responds by returning the corresponding file. If the search does not yield results, an error message is generated in response.

By adopting this approach, we can use the application without the need for a dedicated server or hosting infrastructure, and we only pay for the service based on actual usage.

Alternatively, we have the option to set up a traditional server and host the application on an EC2 instance.
