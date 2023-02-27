# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Contributing

### The architecture
The architecture of the lambda was split into 3 layers (AKA the layered architecture). 

- **app** - This is where we handle the general flow of data. In the interest of saving time, and lack of line count,
the handlers are found here: `resources/shortener/app/handlers/index.ts`
- **model** - This is where we handle the business logic. We have one entity called Url which can be found here:
`resources/shortener/model/url.ts`
- **infra** - This is where we handle the external service communication. 

The reason I went with this architecture is in part due to experience and existing personal 
tools to set things up. This architecture is extremely flexible if additional features are needed at the cost of a more verbose directory structure.

### Tech stack decisions

I've gone through quite a few bits of technology as I took this exercise as a learning opportunity to broaden my horizons
with things I've not had a chance to use. 

The layered architecture was for maintainability and extensibility and in hindsight, the 3 folders could probably just be 3 ts files.

#### First Pass
- Wanted to use postgres - The DB tech stack I am most familiar with however it didn't seem like it was worth the overhead, and extensive optimizations, that were needed to get the same speed as Redis + DynamoDb.

#### Second Pass
- Due to the architectural decisions, I was able to swap out posters with dynamodb in minutes and I am really glad I did. 
If I had time I would have put a Redis cache, if not DAX, in front of DynamoDB to support bursts of requests. Due to fear of surprise costs, I opted to not go down that path. 

### Objective 3
-  **guarantee handling of traffic bursts with over 9000 parallel requests?**
    - Set up a redis key-value store
      - Data is stored in memory at the cost of reliability
- **minimize monthly cloud provider costs as much as possible?**
  - Determine the pricing of each resource in use 
  - Ensure resources being used are the right size/scale. 
- **protect the POST action so that only our administrators can submit URLs?**
  - We have to ensure we validate authentication headers in the lambda
  - Enable `AWS_IAM` authentication on lambda URL and grant the correct policy on the respective role
  