export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "An adventurous solo journey to explore the unknown!",
        icon: "🧳",
        people: "1"
    },
    {
        id: 2,
        title: "Couple Retreat",
        desc: "A romantic getaway filled with love, adventure, and memories!",
        icon: "💑",
        people: "2"
    },
    {
        id: 3,
        title: "Friends Trip",
        desc: "Unforgettable moments, endless laughter, and crazy adventures with friends!",
        icon: "🧑‍🤝‍🧑",
        people: "3+"
    },
    {
        id: 4,
        title: "Family Vacation",
        desc: "A joyful escape with loved ones, creating memories to last a lifetime!",
        icon: "👨‍👩‍👧‍👦",
        people: "4+"
    }
];


export const SelectBudget = [
    {
        id: 1,
        title: "Cheap",
        desc: "Smart spending for big adventures on a small budget!",
        icon: "💰"
    },
    {
        id: 2,
        title: "Moderate",
        desc: "A balanced trip with comfort and affordability!",
        icon: "🎒"
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Indulge in premium experiences and lavish stays!",
        icon: "✨"
    }
];


export const AI_PROMPT="Generate Travel Plan for location:{location} for {noOfDays} Day's for {noOfPeople} with a {budget} budget,Give me a hotels options list with HotelName,Hotel address ,Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details.Place Image Url,Geo coordinates, ticket Pricing,ratng  Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format "
