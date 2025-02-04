function status(request, response) {
  response.status(200).send({
    status: "OKs",
  });
}

export default status;
