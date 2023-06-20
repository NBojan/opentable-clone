import prisma from "@/utils/forPisma";
import { times } from "@/utils/times";
import { NextApiRequest, NextApiResponse } from "next";

const availability = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug, day, time, partySize } = req.query as {
        slug: string,
        day: string,
        time: string,
        partySize: string
    };
    
    if(!day || !time || !partySize) return res.status(400).json({errMsg: "Invalid Data Provided"});

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true, openTime: true, closeTime: true, tables: true,
        }
    });

    if(!restaurant) return res.status(400).json({errMsg: "Invalid Restaurant."});
    if(restaurant.tables.length < 1) return res.status(400).json({errMsg: "Reservations closed at this restaurant."});

    const searchTimes = times.find(searchTime => searchTime.time === time)?.searchTimes;
    if(!searchTimes) return res.status(400).json({errMsg: "Invalid time."});

    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables: restaurant.tables
        }
    })

    const bookings = await prisma.booking.findMany({
        where: {
            restaurant_id: {
                equals: restaurant.id
            },
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select: { booking_time: true, number_of_people: true, tables: true }
    });

    const bookedTimesAndTables = {} as {[key: string]: {[key:number] : true}};

    bookings.forEach(booking => {
        const bookedTime = booking.booking_time.toISOString();
        const bookedTablesForTime = booking.tables.reduce((sum, table) => {
            sum = {
                ...sum,
                [table.table_id]: true
            }
            return sum
        }, {});
        bookedTimesAndTables[bookedTime] = {...bookedTimesAndTables[bookedTime], ...bookedTablesForTime};
    })
    
    searchTimesWithTables.forEach(searchTime => {
        if(bookedTimesAndTables[searchTime.date.toISOString()]){
            searchTime.tables = searchTime.tables.filter(table => {
                if(bookedTimesAndTables[searchTime.date.toISOString()][table.id]) return false;
                else return true
            })
        }
    })

    const availability = searchTimesWithTables.map(searchTime => {
        const totalSeats = searchTime.tables.reduce((sum, table) => {
            sum += table.seats
            return sum
        }, 0)

        return {
            available: totalSeats >= parseInt(partySize),
            time: searchTime.time,
            day,
            partySize,
        }
    }).filter(time => {
        const afterOpeningTime = new Date(`${day}T${time.time}`) >= new Date(`${day}T${restaurant.openTime}`);
        const beforeClosingTime = new Date(`${day}T${time.time}`) <= new Date(`${day}T${restaurant.closeTime}`);
        if(afterOpeningTime && beforeClosingTime) return true
    })

    return res.status(200).json(availability)
}
 
export default availability;