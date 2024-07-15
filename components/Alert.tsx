"use client";
import React, { useEffect } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface AlertProps {
  title: string;
  text: string;
  icon: SweetAlertIcon;
}

const MySwal = withReactContent(Swal);

const Alert: React.FC<AlertProps> = ({ title, text, icon }) => {
  useEffect(() => {
    MySwal.fire({
      title,
      text,
      icon,
    });
  }, [title, text, icon]);

  return null;
};

export default Alert;
