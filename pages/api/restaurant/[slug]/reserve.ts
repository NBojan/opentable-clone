import prisma from "@/utils/forPisma";
import { times } from "@/utils/times";
import { NextApiRequest, NextApiResponse } from "next";

const reserve = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        const { slug, day, time, partySize } = req.query as {
            slug: string,
            day: string,
            time: string,
            partySize: string
        };
        const { bookerFirstName, bookerLastName, bookerEmail, bookerPhone, bookerOccasion, bookerRequest } = req.body;

        if(!day || !time || !partySize || !bookerFirstName || !bookerLastName || !bookerEmail || !bookerPhone) {
            return res.status(400).json({errMsg: "Invalid Data Provided"});
        }
        if(new Date(`${day}T${time}`) < new Date()) return res.status(400).json({errMsg: "Select a Valid Date"});

        let numberOfPeople = parseInt(partySize);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug
            },
            select: {
                id: true, openTime: true, closeTime: true, tables: true
            }
        });
        
        if(!restaurant) return res.status(400).json({errMsg: "Invalid Restaurant."});
        if(restaurant.tables.length < 1) return res.status(400).json({errMsg: "Reservations closed at this restaurant."});

        const searchTime = times.find(t => t.time === time);
        if(!searchTime) return res.status(400).json({errMsg: "Invalid time."});

        const searchTimeWithTables = {
            date: new Date(`${day}T${time}`),
            time,
            tables: restaurant.tables
        }

        const bookings = await prisma.booking.findMany({
            where: {
                restaurant_id: {
                    equals: restaurant.id
                },
                booking_time: {
                    equals: searchTimeWithTables.date
                }
            },
            select: { booking_time: true, number_of_people: true, tables: true }
        })

        const bookedTables = [] as number[]; 
        
        bookings.forEach(booking => {
            booking.tables.forEach(table => {
                bookedTables.push(table.table_id);
            })
        })
        searchTimeWithTables.tables = searchTimeWithTables.tables.filter(table => {
            const tableReserved = bookedTables.find(t => t === table.id);
            if(tableReserved !== undefined) return false
            else return true
        })

        const availableSeats = searchTimeWithTables.tables.reduce((sum, table) => {
            sum += table.seats
            return sum
        }, 0)
        
        if(numberOfPeople > availableSeats) return res.status(400).json({errMsg: "No availability, please try a different time."});

        const tableCount: {
            twoSeatTable: number[],
            fourSeatTable: number[]
        } = {
            twoSeatTable: [],
            fourSeatTable: []
        };

        const tablesToBook: number[] = [];

        searchTimeWithTables.tables.forEach(table => {
            if(table.seats === 2) tableCount.twoSeatTable.push(table.id)
            else tableCount.fourSeatTable.push(table.id)
        })


        while(numberOfPeople > 0){
            if(numberOfPeople >= 3){
                if(tableCount.fourSeatTable.length){
                    tablesToBook.push(tableCount.fourSeatTable[0]);
                    tableCount.fourSeatTable.shift();
                    numberOfPeople = numberOfPeople - 4;       
                }
                else {
                    tablesToBook.push(tableCount.twoSeatTable[0]);
                    tableCount.twoSeatTable.shift();
                    numberOfPeople = numberOfPeople - 2; 
                }
            }
            else {
                if(tableCount.twoSeatTable.length){
                    tablesToBook.push(tableCount.twoSeatTable[0]);
                    tableCount.twoSeatTable.shift();
                    numberOfPeople = numberOfPeople - 2;       
                }
                else {
                    tablesToBook.push(tableCount.fourSeatTable[0]);
                    tableCount.fourSeatTable.shift();
                    numberOfPeople = numberOfPeople - 4; 
                }
            }
        }

        const newBooking = await prisma.booking.create({
            data: {
                number_of_people: parseInt(partySize),
                booking_time: searchTimeWithTables.date,
                booker_email: bookerEmail,
                booker_phone: bookerPhone,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_occasion: bookerOccasion,
                booker_request: bookerRequest,
                restaurant_id: restaurant.id
            }
        })
        
        if(!newBooking) return res.status(400).json({errMsg: "Server error, try again later."});

        const bookingOnTablesData = tablesToBook.map(table => {
            return {
                table_id: table,
                booking_id: newBooking.id
            }
        })

        const bookingsOnTables = await prisma.bookingsOnTables.createMany({
            data: bookingOnTablesData
        })

        return res.status(200).json(newBooking)
    }


    return res.status(500).json({
        errMsg: "Post request por favor."
    })
}
 
export default reserve;