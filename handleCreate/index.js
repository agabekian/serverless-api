exports.createHandler = async (event) => {
    const requestBody = JSON.parse(event.body);

    try {
        const newItem = await peopleModel.create(requestBody);
        return {
            statusCode: 201,
            body: JSON.stringify(newItem)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};
