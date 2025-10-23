import express from 'express';
import { confirmBookingHandler, createBookingHandler } from '../../controllers/booking.controller';
import {CreateBookingSchema} from "../../validators/booking.validator";
import {validateRequestBody} from "../../validators";

const bookingRouter=express.Router();

bookingRouter.post("/",validateRequestBody(CreateBookingSchema),
                createBookingHandler);

bookingRouter.get("/confirm/:key",confirmBookingHandler);

export default bookingRouter;

