// Central config for wedding website. Update values here for global changes.

export const siteConfig = {
  couple: {
    names: "Ava & Noah",
  },
  wedding: {
    date: "2026-09-19T16:00:00-04:00", // ISO format
    venue: "The Glasshouse",
    address: "660 12th Ave, New York, NY 10019",
    city: "New York, NY",
    dressCode: "Black Tie Optional",
  },
  storyTimeline: [
    { year: "2015", title: "We Met", description: "A chance encounter at a coffee shop in Brooklyn." },
    { year: "2018", title: "First Trip", description: "Explored the Amalfi Coast together." },
    { year: "2022", title: "Engaged", description: "A sunset proposal in Paris." },
  ],
  schedule: [
    { day: "Friday", events: [ { time: "7:00 PM", title: "Welcome Drinks", location: "The Roof, Public Hotel" } ] },
    { day: "Saturday", events: [ { time: "4:00 PM", title: "Ceremony", location: "The Glasshouse" }, { time: "5:00 PM", title: "Cocktail Hour", location: "Terrace" }, { time: "6:30 PM", title: "Reception & Dinner", location: "Main Hall" } ] },
    { day: "Sunday", events: [ { time: "11:00 AM", title: "Farewell Brunch", location: "Sadelle's" } ] },
  ],
  travel: {
    hotels: [
      { name: "The Standard, High Line", link: "https://www.standardhotels.com/new-york/properties/high-line" },
      { name: "The Bowery Hotel", link: "https://www.theboweryhotel.com/" },
    ],
    airports: ["JFK", "LGA", "EWR"],
    info: "We recommend flying into JFK or LGA. Ride shares and taxis are readily available."
  },
  registry: [
    { name: "Zola", link: "https://www.zola.com/registry/avaandnoah" },
    { name: "Bloomingdale's", link: "https://www.bloomingdales.com/registry" },
  ],
  faq: [
    { q: "What is the dress code?", a: "Black Tie Optional. Think formal, but comfortable." },
    { q: "Are kids welcome?", a: "We love your little ones, but this is an adults-only celebration." },
    { q: "Can I bring a plus one?", a: "If your invitation says 'and Guest', absolutely!" },
    { q: "Is there parking?", a: "Valet parking is available at the venue." },
  ],
};
