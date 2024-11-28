import React from 'react';

const Header: React.FC = () => {
	return (
		<header className="fixed top-0 left-0 w-full bg-black text-white p-4 flex justify-between items-center z-10 border-b-4 border-skyblue">
			{/* Logo area on the left */}
			<div className="text-xl font-semibold text-saffron">
				<span>Workflow Builder</span>
			</div>

			{/* Save Workflow button on the right */}
			<div className="flex space-x-4">
				<button className="bg-skyblue text-black p-2 rounded-md hover:bg-saffron transition-colors">
					Save Workflow
				</button>
			</div>
		</header>
	);
};

export default Header;
