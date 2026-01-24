import React from 'react'
import { useState } from 'react';

const Issues = () => {
    const issuesData = [
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwbO41EZi1pZ9uDPADI_GGRJvJdqx6EKwug&s",
    "location": "Shivaji Nagar, JM Road, Pune, Maharashtra",
    "issuetype": "Pothole",
    "description": "Deep pothole causing frequent traffic jams.",
    "username": "Amit Kulkarni",
    "date_created": "2025-02-10"
  },
  {
    "image": "https://media.istockphoto.com/id/929942316/photo/old-highway-with-holes-and-snow-landscape-road-potholes-in-cloudy-winter-weather-concept.jpg?s=612x612&w=0&k=20&c=ZtK8wJgXLQYEWGMJVGeyZBqVPKsdHMQlml1Vx8i17aw=",
    "location": "Andheri East, MIDC Road, Mumbai, Maharashtra",
    "issuetype": "Pothole",
    "description": "Road damaged badly affecting daily commuters.",
    "username": "Kunal Mehta",
    "date_created": "2025-06-18"
  },
  {
    "image": "https://media.istockphoto.com/id/601908512/photo/large-deep-pothole-in-montreal-street-canada.jpg?s=612x612&w=0&k=20&c=BrRemAWV7U0-02-Ob7UtQ0c4nz7Owi81bgy9SWZOaM4=",
    "location": "Shastri Nagar, Ajmer Road, Jaipur, Rajasthan",
    "issuetype": "Pothole",
    "description": "Large pothole causing vehicle breakdowns.",
    "username": "Mohit Choudhary",
    "date_created": "2025-09-01"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFReE3Ew5C0wzSW235mNbLfUklJrqtCNVuQ&s",
    "location": "Saket Colony, Alwar Road, Gurugram, Haryana",
    "issuetype": "Pothole",
    "description": "Pothole making the road unsafe for two-wheelers.",
    "username": "Vikas Yadav",
    "date_created": "2026-01-04"
  },

   {
    "image": "https://res.cloudinary.com/dd4s9ife4/image/upload/v1769165037/users/xmkdehsnakybcbwjd9ht.jpg",
    "location": "Laxmi Colony, RC Dutt Road, Vadodara, Gujarat",
    "issuetype": "Water Leak",
    "description": "Water leaking continuously from underground pipe.",
    "username": "Neha Desai",
    "date_created": "2025-03-12"
  },
  {
    "image": "https://t4.ftcdn.net/jpg/18/30/80/81/360_F_1830808176_tGJFIO2vfmwDDYoVFXJU4JKgqcn7VaJ2.jpg",
    "location": "Kukatpally Housing Board, Hyderabad, Telangana",
    "issuetype": "Water Leak",
    "description": "Water leakage causing slippery road surface.",
    "username": "Arjun Reddy",
    "date_created": "2025-07-09"
  },
  {
    "image": "https://media.istockphoto.com/id/1081436086/photo/water-pressure-from-a-large-pipe-over-the-river.jpg?s=612x612&w=0&k=20&c=JoUu7W3og1KTi4O5pddUznkqkNd4kAtbTKop-ull09c=",
    "location": "Sector 62, Noida, Uttar Pradesh",
    "issuetype": "Water Leak",
    "description": "Continuous water leak leading to water wastage.",
    "username": "Sneha Verma",
    "date_created": "2025-10-16"
  },
  {
    "image": "https://www.hindustantimes.com/ht-img/img/2023/05/09/550x309/Thane--India---May-09--2023--Water-being-wasted-du_1683660844427.jpg",
    "location": "Dilsukhnagar, Hyderabad, Telangana",
    "issuetype": "Water Leak",
    "description": "Leak from roadside pipeline flooding the street.",
    "username": "Srinivas Rao",
    "date_created": "2026-01-08"
  },

  {
    "image": "https://images.indianexpress.com/2025/09/bhosari-hazardous-waste.jpg?w=1200",
    "location": "Bapu Nagar, Kalavad Road, Rajkot, Gujarat",
    "issuetype": "Garbage",
    "description": "Garbage piled near residential buildings.",
    "username": "Pooja Patel",
    "date_created": "2025-04-05"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDTfa9oPcyGnzasqWG9WTvMrClR4hSGRa44Q&s",
    "location": "Anna Nagar West, Chennai, Tamil Nadu",
    "issuetype": "Garbage",
    "description": "Garbage not collected for several days.",
    "username": "Divya Iyer",
    "date_created": "2025-06-28"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROoWjD_ukKA565F1EHJlNnQFwOcpvB_ZC55Q&s",
    "location": "Lake Town, VIP Road, Kolkata, West Bengal",
    "issuetype": "Garbage",
    "description": "Garbage dumped beside the main road.",
    "username": "Sourav Banerjee",
    "date_created": "2025-09-14"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_XPL3yj4moDiE78dCzcN7_ch1JedrcFmnTQ&s",
    "location": "Talwandi, Kota, Rajasthan",
    "issuetype": "Garbage",
    "description": "Garbage spread across the street.",
    "username": "Riya Sharma",
    "date_created": "2025-12-02"
  },

  {
    "image": "https://static.toiimg.com/thumb/msid-27493114,imgsize-29939,width-400,resizemode-4/27493114.jpg",
    "location": "Gandhi Nagar, Ring Road, Indore, Madhya Pradesh",
    "issuetype": "Drainage",
    "description": "Drainage overflow causing foul smell.",
    "username": "Saurabh Jain",
    "date_created": "2025-05-19"
  },
  {
    "image": "https://static.toiimg.com/thumb/msid-62091398,width-400,resizemode-4/62091398.jpg",
    "location": "Civil Lines, Prayagraj, Uttar Pradesh",
    "issuetype": "Drainage",
    "description": "Open drainage overflowing during rainfall.",
    "username": "Ankit Mishra",
    "date_created": "2025-07-27"
  },
  {
    "image": "https://static.toiimg.com/thumb/msid-27493114,imgsize-29939,width-400,resizemode-4/27493114.jpg",
    "location": "Panchvati, Nashik, Maharashtra",
    "issuetype": "Drainage",
    "description": "Blocked drain leading to water stagnation.",
    "username": "Nikhil Patil",
    "date_created": "2025-10-05"
  },
  {
    "image": "https://media.assettype.com/indiawaterportal%2Fimport%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimage_1200x675%2Fpublic%2F2024-08%2FDrains.jpg",
    "location": "Ashok Nagar, Ranchi, Jharkhand",
    "issuetype": "Drainage",
    "description": "Drain water overflowing onto main road.",
    "username": "Pankaj Verma",
    "date_created": "2025-12-20"
  },

   {
    "image": "https://www.hindustantimes.com/ht-img/img/2023/07/23/1600x900/A-non-functioning-street-light-at-southern-bypass-_1690134239324.jpg",
    "location": "Sector 14, Rohini, New Delhi",
    "issuetype": "Street Light",
    "description": "Street lights not working at night.",
    "username": "Ravi Singh",
    "date_created": "2025-01-25"
  },
  {
    "image": "https://citizen.complainthub.org/uploads/default/fbc901fad7060aaf102d86bc185aeb229cba7724",
    "location": "MG Road, Ernakulam, Kochi, Kerala",
    "issuetype": "Street Light",
    "description": "Flickering street light causing poor visibility.",
    "username": "Rahul Menon",
    "date_created": "2025-08-08"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn04un6izXJ5Qej0CsDHUWNaPtCPBw_UCK7A&s",
    "location": "Rajaji Nagar, Bengaluru, Karnataka",
    "issuetype": "Street Light",
    "description": "Street lights not functioning near bus stop.",
    "username": "Harsha Gowda",
    "date_created": "2025-11-11"
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsDp479rbhzssGciiXZdGFGd0SZ_TwqN0S2w&s",
    "location": "Model Town, Jalandhar, Punjab",
    "issuetype": "Street Light",
    "description": "Non-functional street light making area unsafe.",
    "username": "Gurpreet Singh",
    "date_created": "2026-01-06"
  }
];

const [upvotes, setUpvotes] = useState(
    issuesData.map(() => 0)
  );

  const handleUpvote = (index) => {
    const updated = [...upvotes];
    updated[index]++;
    setUpvotes(updated);
  };
  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-10 text-center">
          Recent Reported Issues
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {issuesData.map((issue, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={issue.image}
                alt={issue.issuetype}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <span className="text-sm font-semibold text-blue-700">
                  {issue.issuetype}
                </span>

                <p className="text-gray-700 mt-2">
                  {issue.description}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  📍 {issue.location}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Reported by {issue.username} • {issue.date_created}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleUpvote(index)}
                    className="px-4 py-2 text-sm rounded-md bg-[#2C3E50] text-white hover:bg-opacity-90"
                  >
                    👍 Upvote ({upvotes[index]})
                  </button>

                  <button className="px-4 py-2 text-sm rounded-md border border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white transition">
                    💬 Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Issues