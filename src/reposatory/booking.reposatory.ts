import { Prisma,BookingStatus } from "@prisma/client";
import PrismaClient from "../prisma/client";

export async function createBooking(bookingInput:Prisma.BookingCreateInput) {
    const booking=await PrismaClient.booking.create({
        data:bookingInput
    });
    return booking;
    
}

export async function createIdempotantyKey(key:string,bookingId:number){
    const idempotantyKeyResponse=await PrismaClient.idempotantyKey.create({
        data:{
            key:key,
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

export async function confirmBooking(bookingId:number) {
    const booking=await PrismaClient.booking.update({
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


export async function finilizeIdempotantyKey(key:string){
    const idempotantyKey=await PrismaClient.idempotantyKey.update({
        where:{
            key:key
        },
        data:{
            finalized:true
        }
    });
    return idempotantyKey;
}

export async function getIdempotantyKey(key:string){
    const idempotantyKey=await PrismaClient.idempotantyKey.findUnique({
        where:{
            key:key
        }
    });
    return idempotantyKey;
}