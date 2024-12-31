import { HttpStatusCode } from "axios";

const HttpStatusFoundMessage = (model?: string) =>
  `This ${model} already exists! Please enter valid information.`;

const HttpStatusBadRequestMessage = () =>
  `Invalid inputs! Please enter valid information.`;

const HttpStatusBadNetworkMessage = () =>
  `Network connection bad! Please check your internet connection and retry again.`;
const HttpStatusInternalServerErrorMessage = () =>
  `Your system is not available! Please try again later.`;

export function HttpMessageFromStatus(
  status: number,
  details?: string
): string {
  let message = "";
  switch (status) {
    case HttpStatusCode.Found:
      message = HttpStatusFoundMessage(details);
      break;

    case HttpStatusCode.BadRequest:
      message = HttpStatusBadRequestMessage();
      break;

    case HttpStatusCode.UnprocessableEntity:
      message = HttpStatusBadRequestMessage();
      break;

    default:
      message = HttpStatusInternalServerErrorMessage();
      break;
  }
  return message;
}
