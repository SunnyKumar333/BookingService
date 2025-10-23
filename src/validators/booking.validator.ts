import { z } from "zod";


export const CreateBookingSchema=z.object({
    userId:z.number({
                        message:"userId must be present"
                    }
                ),
    hotelId:z.number({
                        message:"hotelId must be present"
                    }
                ),
    bookingAmount:z.number({
                            message:"bookingAmount should be present"
                        }
                    ).min(0,{
                        message:"bookingAmount should be positive"
                    }
                ),
    totalGuest:z.number({
                        message:"totalGuest should be present"
                    }
                ).min(1,{
                    message:"totalGuest should be atleast 1"
                }
            )
})