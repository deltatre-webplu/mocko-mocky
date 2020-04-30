import * as express from "express";
import * as bodyParser from "body-parser";

export function requestParser() {
	return [
		express.urlencoded({ extended: false }),
		bodyParser.urlencoded({ extended: true }),
		bodyParser.json()
	];
}