import { RequestHandler } from "express";
import { UserRepository } from "../repositories/user/UserRepository";
import { Timestamp } from "firebase-admin/firestore";

const userRepository = new UserRepository();

export const createUser: RequestHandler = (request, response) => {
  // TODO validation
  const { body } = request;
  userRepository
    .create({ ...body, recentlyActive: Timestamp.now().seconds })
    .then((result) => {
      if (result) response.status(201);
      else response.status(400).send({ message: "failed to create" });
    });
};

export const listUsers: RequestHandler = (request, response) => {
  userRepository.find().then((result) => {
    if (result) response.status(200).send(result);
    else response.status(500).send(result);
  });
};

export const findUser: RequestHandler<{ id: string }> = (request, response) => {
  userRepository.findOne(request.params.id).then((result) => {
    if (result) response.status(200).send(result);
    else response.status(500).send(result);
  });
};

export const updateUser: RequestHandler<{ id: string }> = (
  request,
  response
) => {
  // TODO validation
  const { body } = request;
  userRepository.update(request.params.id, body).then((result) => {
    if (result) response.status(200).send(result);
    else response.status(500).send(result);
  });
};

export const deleteUser: RequestHandler<{ id: string }> = (
  request,
  response
) => {
  userRepository.delete(request.params.id).then((result) => {
    if (result) response.status(200).send(result);
    else response.status(500).send(result);
  });
};
