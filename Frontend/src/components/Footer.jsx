import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className=" w-full md:w-2/3 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium, nulla? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Esse nisi ratione accusantium veniam, autem
            accusamus facilis magni sed illo voluptas deserunt iure modi placeat
            fugit tenetur repudiandae nulla sequi, quo voluptatum veritatis
            necessitatibus distinctio. Voluptas, repudiandae suscipit, placeat
            soluta aperiam sed laboriosam culpa necessitatibus dignissimos amet
            perferendis, eveniet quis dolorum?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
              </div>
              
              <div>
                  <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                      <ul className="flex flex-col gap-1 text-gray-600">
                          <li>+1-212-456-7890</li>
                          <li>contact@foreverClothing.com</li>
                      </ul>

                  
            </div> 

          </div>
          
          <div>
              <hr className="text-zinc-200" />
              <p className="py-5 tex-sm text-center">Copyright 2026@foreverclothing.com - All Rights Reserved</p>
          </div>

    </div>
  );
};

export default Footer;
