import { NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";

import Logo from '../assets/img/thomson-logo.webp';

const menuData = [
    {
        id: 1,
        name: 'Home',
        link: '/home',
    },
    {
        id: 2,
        name: 'About',
        link: 'about-us',
    },
    {
        id: 3,
        name: 'TV',
        link: '/category/televisions',
        submenu: [
            {
                id: 3.1,
                name: 'LED TV',
                link: 'tv 1',
                img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/menu/qled.webp',
            },
            {
                id: 3.2,
                name: 'SMART TV',
                link: 'tv 2',
                img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/menu/qled.webp',
            },
            {
                id: 3.3,
                name: 'ANDROID TV',
                link: 'tv 3',
                img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/menu/qled.webp',
            },
            {
                id: 3.4,
                name: '4K TV',
                link: 'tv 4',
                img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/menu/qled.webp',
            },
            {
                id: 3.5,
                name: 'QLED TV',
                link: 'tv 5',
                img: 'https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/menu/qled.webp',
            }
        ],
    },
    {
        id: 4,
        name: 'Appliances',
        link: 'appliances',
        submenu: [
            {
                id: 4.1,
                name: 'Washing Machine',
                link: 'tv 1',
                submnenulist: [
                    {
                        id: 401.1,
                        name: 'Semi Automatic',
                        link: 'tv 2',
                    },
                    {
                        id: 401.2,
                        name: 'FULLY AUTOMATIC',
                        link: 'tv 2',
                    },
                    {
                        id: 401.3,
                        name: 'WASHERS',
                        link: 'tv 2',
                    },
                ],
            },
            {
                id: 4.2,
                name: 'Air Conditioners',
                link: 'tv 2',
                submnenulist: [
                    {
                        id: 402.1,
                        name: 'Window AC',
                        link: 'tv 2',
                    },
                    {
                        id: 402.2,
                        name: 'FIXED SPEED',
                        link: 'tv 2',
                    },
                    {
                        id: 402.3,
                        name: 'INVERTER',
                        link: 'tv 2',
                    },
                ],
            },
            {
                id: 4.3,
                name: 'Air Coolers',
                link: 'tv 3',
                submnenulist: [
                    {
                        id: 403.1,
                        name: 'PERSONAL',
                        link: 'tv 2',
                    },
                    {
                        id: 403.2,
                        name: 'DESERT',
                        link: 'tv 2',
                    },
                    {
                        id: 403.3,
                        name: 'WINDOW COOLER',
                        link: 'tv 2',
                    },
                ]
            },
        ]
    },
    {
        id: 5,
        name: 'Media',
        link: '/media',
    },
    {
        id: 6,
        name: 'Contact',
        link: '/contact',
    }
]

export default function Header() {

    const menuShow = () => {
        window.$('.mega-menu-thomson.responsive').toggleClass('show');
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-dark navbar-expand-lg navbar-dark menu-nav">
                    <div className="container-fluid">
                        <NavLink to={'/'}>
                            <img src={Logo} className="img-fluid logo-img" alt="Thomlogo" />
                        </NavLink>
                        <div className='menu-thomson'>
                            <div className="menu-btn-thomson" onClick={menuShow}>
                                <HiOutlineMenuAlt3 />
                            </div>

                            <ul className='mega-menu-thomson responsive'>
                                <li className='menu-btn-close' onClick={menuShow}>
                                    <ImCancelCircle />
                                </li>
                                {
                                    menuData && menuData.map((item, index) => {
                                        return (
                                            <li key={index} className='mega-menu-thomson-li' >
                                                <NavLink to={item.link}>
                                                    <span>{item.name}</span>
                                                </NavLink>
                                                {
                                                    item.submenu ?
                                                        <div className="mega-menu-inner" >
                                                            <ul className={`mega-menu-inner-ul ${item.name}`}>
                                                                {
                                                                    item.submenu && item.submenu.map((item, index) => {
                                                                        return (
                                                                            <li key={index} className='submenu-heading' >
                                                                                <NavLink to={item.link}>
                                                                                    {
                                                                                        item.img ?
                                                                                            <div className="menu-img">
                                                                                                <img src={item.img} className='img-fluid' alt={item.img} />
                                                                                            </div>
                                                                                            : null
                                                                                    }

                                                                                    <span>{item.name}</span>
                                                                                </NavLink>
                                                                                {
                                                                                    item.submnenulist ?
                                                                                        <ul className='submenu-sublist' >
                                                                                            {
                                                                                                item.submnenulist && item.submnenulist.map((item, index) => {
                                                                                                    return (
                                                                                                        <li key={index}>
                                                                                                            <NavLink to={item.link}>
                                                                                                                <span>{item.name}</span>
                                                                                                            </NavLink>
                                                                                                        </li>

                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </ul>
                                                                                        : null
                                                                                }
                                                                            </li>


                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                        </div>
                                                        : null
                                                }

                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>



                    </div>
                </nav>
            </header>
        </>
    )
}
