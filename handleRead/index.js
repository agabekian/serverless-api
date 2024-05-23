exports.handler = async (event) => {
    console.log("BODY", event.body);

    const response = { statusCode: null, body: null };

    try {
        if (event.pathParameters && event.pathParameters.id) {
            // Fetch specific person by id
            const id = event.pathParameters.id;
            let result = await peopleModel.get({ id });

            if (result) {
                response.body = JSON.stringify(result);
                response.statusCode = 200;
            } else {
                response.body = JSON.stringify({ message: "Person not found" });
                response.statusCode = 404;
            }
        } else {
            // Fetch all people
            let results = await peopleModel.scan().exec();
            response.body = JSON.stringify(results);
            response.statusCode = 200;
        }
    } catch (e) {
        response.body = JSON.stringify({ message: e.message });
        response.statusCode = 500;
    }

    return response;
};
