import { Prisma,BookingStatus,IdempotantyKey } from "@prisma/client";
import PrismaClient from "../prisma/client";
import {validate as isValidUUID} from "uuid";
import { BadRequestError } from "../utils/errors/app.error";

export async function createBooking(bookingInput:Prisma.BookingCreateInput) {
    const booking=await PrismaClient.booking.create({
        data:bookingInput
    });
    return booking;
    
}

export async function createIdempotantyKey(key:string,bookingId:number){
    const idempotantyKeyResponse=await PrismaClient.idempotantyKey.create({
        data:{
            idempotantyKey:key,
            booking:{
                connect:{id:bookingId}
            }
        }
    });
    return idempotantyKeyResponse;

}

export async function getBookingById(bookingId:number){
    const booking=await PrismaClient.booking.findUnique({
        where:{
            id:bookingId
        }
    });
    return booking;

}

export async function confirmBooking(txn:Prisma.TransactionClient,bookingId:number) {
    const booking=await txn.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:BookingStatus.CONFIRMED
        }
    });
    return booking;
}

export async function cancelBooking(bookingId:number) {
    const booking=await PrismaClient.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:BookingStatus.CANCELLED
        }
    });
    return booking;
}


export async function finilizeIdempotantyKey(txn:Prisma.TransactionClient,key:string){
    const idempotantyKey=await txn.idempotantyKey.update({
        where:{
            idempotantyKey:key
        },
        data:{
            finalized:true
        }
    });
    return idempotantyKey;
}

export async function getIdempotantyKeyWithLock(txn:Prisma.TransactionClient,key:string){
    if(!isValidUUID(key)){
        throw new BadRequestError("idempotantey key format is not UUID");
    }
    // const idempotantyKey=await txn.idempotantyKey.findUnique({
    //     where:{
    //         key:key
    //     },
        
    // });
    const idempotantyKey:Array<IdempotantyKey>=await txn.$queryRaw`
    SELECT * FROM IdempotantyKey WHERE idempotantyKey=${key} FOR UPDATE;
    `;
    if(idempotantyKey==null || idempotantyKey.length==0){
        return null;
    }
    return idempotantyKey[0];
}

