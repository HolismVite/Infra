import React, { useState, useEffect } from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Panel from './Panel';
import app from '../../Base/App';


const Tabs = ({ title, subtitle, breadcrumbItems, tabs }) => {

	const [tabNumber, setTabNumber] = useState(0);
	var tabsArray = React.Children.toArray(tabs)[0].props.children;

	useEffect(() => {
		app.emit(app.componentLoaded, {
			freeze: true,
			pageTitle: title,
			pageSubtitle: subtitle,
			breadcrumbItems: breadcrumbItems
		});
		return () => {
			app.emit(app.componentLoaded, {
				freeze: false
			});
		}
	}, []);

	return <div>
		<div
			style={{ maxWidth: '100vw' }}
			className="overflow-x-auto flex justify-center "
		>
			<MuiTabs
				className="border-b bg-white"
				value={tabNumber}
				onChange={(event, number) => setTabNumber(number)}
				variant="scrollable"
				scrollButtons="auto"
			>

				{
					tabsArray.map(tab => {
						const Icon = tab.props.icon
						return <MuiTab
							key={tab.props.title}
							label={tab.props.title}
							icon={tab.props.icon ? <Icon /> : null}
							iconPosition="top"
						/>
					})
				}
			</MuiTabs>
		</div>
		<div
			className="bg-white p-6 md:rounded-lg"
		>
			{
				tabsArray.map((tab, index) => {
					return <Panel
						key={index}
						value={tabNumber}
						index={index}
					>
						{tab.props.panel}
					</Panel>
				})
			}
		</div>
	</div>
}

export { Tabs }