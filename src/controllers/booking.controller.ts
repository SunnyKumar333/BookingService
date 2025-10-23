import { NextFunction, Request, Response } from "express";
import {createBookingService, finializeBookingService} from "../services/booking.service";
// import {CreateBookingDTO} from "../dto/booking.dto"

export async function createBookingHandler(request:Request,response:Response,next:NextFunction){
    // const dto={
    //     userId:request.body.userId,
    //     hotelId:request.body.hotelId,
    //     bookingAmmount:request.body.bookingAmmount,
    //     totalGuest:request.body.totalGuest
    // };

    const booking=await createBookingService(request.body)
    response.status(201).json({
        success:true,
        data:booking
    })
 
}

export async function confirmBookingHandler(request:Request,response:Response,next:NextFunction) {
    const idempotantyKey=request.params.key;
    const booking=await finializeBookingService(idempotantyKey)
    response.status(201).json({
        success:true,
        data:booking
    })
    
}
