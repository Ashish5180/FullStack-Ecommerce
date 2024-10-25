import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaCity, FaPhoneAlt } from 'react-icons/fa';

function Address() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border border-gray-300 sm:rounded-md"
    >
      <form method="POST" action="https://herotofu.com/start" encType="multipart/form-data">
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaUser className="mr-2" /> Your name
          </span>
          <motion.input
            name="name"
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Joe Bloggs"
            whileFocus={{ scale: 1.05 }}
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Address line 1
          </span>
          <motion.input
            name="address1"
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            whileFocus={{ scale: 1.05 }}
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Address line 2
          </span>
          <motion.input
            name="address2"
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            whileFocus={{ scale: 1.05 }}
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaCity className="mr-2" /> City
          </span>
          <motion.input
            name="city"
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            whileFocus={{ scale: 1.05 }}
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center">
            <FaPhoneAlt className="mr-2" /> Phone
          </span>
          <motion.input
            name="phone"
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            whileFocus={{ scale: 1.05 }}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Delivery information</span>
          <motion.textarea
            name="message"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            placeholder="Floor/door lock code/etc."
            whileFocus={{ scale: 1.05 }}
          ></motion.textarea>
        </label>
        
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
          >
            Save
          </button>
        </motion.div>
        
        
      </form>
    </motion.div>
  );
}

export default Address;
