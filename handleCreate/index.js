const dynamoose = require('dynamoose');
const schema = new dynamoose.Schema({
    "id": String,
    "name": String
});

// Define model
const peopleModel = dynamoose.model('people', schema);
// Lambda function handler for creating items
exports.handler = async (event) => {
    console.log('Event received:', event);

    // Parse the request body
    const requestBody = event.body;

    console.log('Request body:', requestBody);

    try {
        // Create a new item in the DynamoDB table
        const newItem = await peopleModel.create(JSON.parse(requestBody));

        // Return success response with the newly created item
        return {
            statusCode: 201,
            body: JSON.stringify(newItem)
        };
    } catch (error) {
        // Return error response if creation fails
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};
