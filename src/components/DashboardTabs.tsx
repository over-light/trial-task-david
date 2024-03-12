import React, { useRef, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';

import { Dashboardcontent } from '~/components/Dashboardcontent';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"

const initialItems = [
    { title: 'Dashboard 1', children: '', key: '1' },
];

export const DashboardTabs = () => {
    const [tablabels, setTabLabels] = useState<string[]>(['Dashboard1']);
    const [activeKey, setActiveKey] = useState(initialItems[0]?.key);
    const [activeTitle, setActiveTitle] = useState(initialItems[0]?.title);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(2);

    const add = () => {
        setTabLabels([...tablabels, `Dashboard${tablabels.length + 1}`])
        const newActiveKey = `${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ title: `Dashboard${tablabels.length + 1}`, children: '', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
        const title = newPanes.filter((item) => item.key === newActiveKey)[0]?.title;
        setActiveTitle(title)
    }

    const remove = (targetKey: string) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex]?.key;
            } else {
                newActiveKey = newPanes[0]?.key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
        const title = newPanes.filter((item) => item.key === newActiveKey)[0]?.title;
        setActiveTitle(title)
    };

    const onChange = (key: React.Key) => {
        setActiveKey(key.toString());
        const title = items.filter((item) => item.key === key.toString())[0]?.title;
        setActiveTitle(title)
    }

    const handleChangeTitle = (nTitle: string) => {
        setActiveTitle(nTitle)
        const activeItem = items.filter((item) => item.key === activeKey)[0];
        if (activeItem) activeItem.title = nTitle;
    }

    const RemoveDashboard = () => {
        remove(activeKey!);
    }
    return (
        <>
            <div className="flex relative w-full flex-col-2">
                <Tabs
                    aria-label="Options"
                    color="default"
                    variant="underlined"
                    selectedKey={activeKey}
                    onSelectionChange={onChange}
                    classNames={{
                        tabList: "w-full gap-1 p-0 border-b border-blue-600 ",
                        cursor: "w-full  bg-white",
                        tab: " w-[130px] h-10 border-r border-l border-t border-blue-600",
                        tabContent: "group-data-[selected=true]:text-green-500"
                    }}
                >
                    {items.map((item) => (
                        <Tab
                            key={item.key}
                            title={
                                <div className="flex items-center justify-between">
                                    <span>{item.title}</span>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <span
                                                className="text-[20px] ml-2 text-gray-400 hover:text-blue-500 hover: cursor-default "
                                            >
                                                &#215;
                                            </span>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle><svg width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M154 260h568v700H154z" fill="#FF3B30" /><path d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z" fill="#030504" /><path d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z" fill="#152B3C" /><path d="M721.185 345.717v-84.641H164.437z" fill="#030504" /><path d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z" fill="#FF3B30" /><path d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z" fill="#FF3B30" /></svg>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete            and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    onClick={RemoveDashboard}
                                                >Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>

                            }
                        >

                        </Tab>
                    ))}
                </Tabs>
                <div
                    className="flex items-center text-[30px] text-white ml-2 hover:text-gray-500 hover: cursor-pointer"
                    onClick={add}
                >
                    +
                </div>
            </div>
            <Dashboardcontent key={activeKey} title={activeTitle!} onTitleChange={handleChangeTitle} RemoveDashboard={RemoveDashboard} />
        </>
    );
}