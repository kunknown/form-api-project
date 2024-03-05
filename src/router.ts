import { Router } from "express";
import { TResponse, TWholeResponse } from "./types";
import { applyQueryParams } from "./utility";

export const router = Router();

router.get("/:formId/filteredResponses", async (req, res) => {
  const { formId } = req.params;
  const queryParams = req.query;
  // reject if API KEY missing
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${process.env.API_KEY ?? ''}`);
  const response = await fetch(`https://api.fillout.com/v1/api/forms/${formId}/submissions`, {method: "GET", headers});
  if(response.body){
    const stream = response.body;
    const reader = stream.getReader();
    const decodedResponse = async () => new Promise((resolve, reject) => {
      const decodedStringArr: string[] = [];
      reader.read().then(function pump({done, value}): unknown {
        if (done) {
          resolve(decodedStringArr);
          return;
        }
        const decodedString = new TextDecoder().decode(value);
        decodedStringArr.push(decodedString);
        return reader.read().then(pump);
      }).catch(error => {reject(error)});
    });
    const stringDecodedResponse = await decodedResponse();
    const formattedDecodedResponse = JSON.parse(stringDecodedResponse as string);
    const wholeResponse: TWholeResponse = formattedDecodedResponse;
    const responses: TResponse[] = wholeResponse.responses;
    console.log('total', responses.length);
    const filteredWholeResponse: TWholeResponse = applyQueryParams(responses, queryParams);
    res.status(200).send(filteredWholeResponse);
  };
})