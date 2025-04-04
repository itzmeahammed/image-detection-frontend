import React from "react";
import "../styles/guidelines.css";

const Guidelines = () => {
  const trafficSigns = [
    {
      img: "https://rukminim2.flixcart.com/image/850/1000/ksuowi80/emergency-sign/j/p/p/ama-2034-madhusigns-original-imag6bzuhajhyyfh.jpeg?q=90&crop=false",
      name: "Helmet Mandatory",
      content:
        "This sign indicates that wearing a helmet is compulsory for two-wheeler riders. It aims to ensure rider safety and minimize head injuries during accidents. Helmets must be worn properly and securely fastened. This rule is enforced by law and must be followed strictly.",
    },

    {
      img: "https://media.istockphoto.com/id/1207567645/vector/u-turn-forbidden-road-sign.jpg?s=612x612&w=0&k=20&c=3NS7a31_qOIJDvtuaaF828AvIld0P7MJjZQKug-RBwA=",
      name: "NO U Turn",
      content:
        "This sign restricts drivers from making a U-turn at the given location. It is usually placed on busy roads or intersections to avoid accidents. Making a U-turn where prohibited can disrupt traffic flow. Drivers must proceed ahead or find a legal spot to turn.",
    },
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2023/1/HW/SY/KR/21032740/one-way-traffic-sign-board-500x500.png",
      name: "One Way",
      content:
        "This sign means that vehicles can travel only in the direction shown. It helps organize the traffic flow, especially on narrow roads. Driving against this sign is illegal and dangerous. Follow the road markings and signs to ensure safe driving.",
    },
    {
      img: "https://m.media-amazon.com/images/I/41A4WT5avmL.jpg",
      name: "Speed Limit",
      content:
        "This sign indicates the maximum speed vehicles are allowed to travel. It is set based on road conditions and safety requirements. Exceeding the speed limit increases the risk of accidents. Always drive within the limit to ensure your and others' safety.",
    },
    {
      img: "https://5.imimg.com/data5/LL/GS/MY-152348/right-turn-prohibited-mandatory-retro-reflective-road-signage-500x500.jpg",
      name: "Left Turn Prohibited",
      content:
        "This sign tells drivers that left turns are not allowed at that junction. It helps avoid traffic disruptions and potential collisions. Ignoring this sign can lead to fines or accidents. Plan your route accordingly to follow traffic rules.",
    },
    {
      img: "https://5.imimg.com/data5/WD/SJ/MY-152348/left-turn-prohibited-mandatory-retro-reflective-road-signage-500x500.jpg",
      name: "Right Turn Prohibited",
      content:
        "This sign indicates that making a right turn is not permitted here. It is placed to manage traffic flow and reduce risk at intersections. Disregarding this sign can cause confusion and danger. Obey all traffic signals for smooth driving.",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/011/004/068/non_2x/no-entry-sign-in-red-circle-vector.jpg",
      name: "No Entry",
      content:
        "This sign means that vehicles are not allowed to enter from this direction. It is used for restricted or one-way streets. Entering a no-entry zone is illegal and hazardous. Always observe entry restrictions to stay safe.",
    },
    {
      img: "https://5.imimg.com/data5/CD/VT/MY-152348/horn-prohibited-mandatory-retro-reflective-road-signage.png",
      name: "Horns Prohibited",
      content:
        "This sign tells drivers not to use their horns in this area. It is commonly seen near hospitals, schools, and residential zones. Unnecessary honking causes noise pollution and discomfort. Respect silent zones to maintain peace and discipline.",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/001/520/400/non_2x/no-parking-sign-on-white-background-free-vector.jpg",
      name: "No Parking",
      content:
        "This sign indicates that vehicles are not allowed to park in this area. It helps prevent traffic congestion and ensures road safety. Violating this rule can lead to fines or vehicle towing. Always look for alternative parking zones when you see this sign.",
    },
  ];

  return (
    <div className='traffic-sign-main-container d-flex gap-16'>
      {trafficSigns.map((val, key) => (
        <div className='traffic-sign-container d-flex-col gap-8 p-16' key={key}>
          <img src={val?.img} alt='' width={250} height={250} />
          <p>{val?.name}</p>
          <span>{val?.content}</span>
        </div>
      ))}
    </div>
  );
};

export default Guidelines;
