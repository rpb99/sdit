import { useState } from 'react'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div role="tabpanel"
            hidden={
                value !== index
            }
            id={
                `student-tabpanel-${index}`
            }
            aria-labelledby={
                `student-tab-${index}`
            }
            {...other}>
            {
                value === index && (
                    <Box p={3}>
                        <div>{children}</div>
                    </Box>
                )
            } </div>
    );
}

function a11yProps(index) {
    return { id: `student-tab-${index}`, 'aria-controls': `student-tabpanel-${index}` };
}


const TabsUI = ({ tabs, contents }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <AppBar position="static" color="transparent"
                style={
                    { color: 'white' }
                }>
                <Tabs value={value}
                    onChange={handleChange}
                    aria-label="tab">
                    {
                        tabs.map((tab, idx) => (
                            <Tab key={idx} label={tab}
                                {...a11yProps(idx)} />
                        ))
                    } </Tabs>
            </AppBar>

            {
                contents.map((content, idx) => (
                    <TabPanel key={idx} value={value}
                        index={idx}>
                        {content} </TabPanel>
                ))
            } </>
    )
}

export default TabsUI
