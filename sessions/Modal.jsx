import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
      <div className="relative w-auto my-6 mx-auto max-w-md z-50">
        <div className="border border-white/10 rounded-xl shadow-2xl relative flex flex-col w-full bg-dark-card outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-white/10 rounded-t">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-white/40 hover:text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition"
              onClick={onClose}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <div className="text-white/80 text-sm leading-relaxed">
              {children}
            </div>
          </div>
          <div className="flex items-center justify-end p-4 border-t border-white/10 rounded-b">
            <button
              className="bg-white/10 text-white active:bg-white/20 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:bg-white/20 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
