"use client";

import { request, requestWithResponse } from "@/lib/request";
import { FooterData } from "@/services/footer/getFooter";
import { useEffect, useState } from "react";

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestWithResponse("/api/footer", "GET");
      setFooterData(data);
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-[#EFEFEF] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerData?.map((section) => (
            <div>
              <h4 className="font-semibold mb-4 text-[#004E64]">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.data.map((item) => (
                  <li>
                    <a
                      href={item.url}
                      className="text-[#37474F] hover:text-[#FF6B35]"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-[#37474F]">
          <p>&copy; 2024 GrabNEat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
