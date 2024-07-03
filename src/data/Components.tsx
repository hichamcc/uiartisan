// data/components.ts

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLaughSquint, faMousePointer, faGhost, faKeyboard, faPaperPlane /* other funny icons */ } from '@fortawesome/free-solid-svg-icons';

import {
    faTableColumns,
    faSquare,
    faClone,
    faSpinner,
    faCommentDots,
    faSquareCheck,
    faCircleDot,
    faStar,
    faCreditCard,
    faTimeline,
    faCircleQuestion,
    faToggleOn,
    faFillDrip,
    faArrowsToDot,
    faTextHeight,
    faPalette,
    faHandPointer,
    faList,
    faArrowRightLong,
    faRotate,
    faComputerMouse,
    faFolder,
    faImage,
    faComment,
    faShareNodes,
    faBell,
    faTable,
    faChartBar
} from '@fortawesome/free-solid-svg-icons';

interface Component {
    name: string;
    description: string;
    link: string;
    icon: IconDefinition;
}

export const components: Component[] = [
    { name: "Layout Generator", description: "Design custom layouts with options for rows, columns, and styles to perfect your webpage structure.", link: "/generators/layout", icon: faTableColumns },
    { name: "Button Generator", description: "Create stylish buttons with customizable colors, sizes, and effects tailored to your brand.", link: "/generators/button", icon: faSquare },
    { name: "Input Generator", description: "Generate input fields with various styles and validation options to streamline user data entry.", link: "/generators/input", icon: faSquare },
    { name: "Shadow Generator", description: "Create custom shadows and add depth to your elements for a more dynamic visual experience.", link: "/generators/shadow", icon: faClone },
    { name: "Spinner Generator", description: "Design custom spinners to indicate loading or processing actions seamlessly integrated into your interface.", link: "/generators/spinner", icon: faSpinner },
    { name: "Tooltip Generator", description: "Create custom tooltips to provide helpful hints and information, improving user interaction.", link: "/generators/tooltip", icon: faCommentDots },
    { name: "Checkbox Generator", description: "Generate custom checkboxes to facilitate user selections and choices with ease.", link: "/generators/checkbox", icon: faSquareCheck },
    { name: "Radio Generator", description: "Create custom Radio buttons for exclusive selections.", link: "/generators/radio", icon: faCircleDot },
    { name: "Rating Generator", description: "Create custom ratings for user feedback and reviews, enhancing user engagement.", link: "/generators/rating", icon: faStar },
    { name: "Card Generator", description: "Design custom cards to present content in an attractive and organized manner.", link: "/generators/card", icon: faCreditCard },
    { name: "Timeline Generator", description: "Create custom timelines to showcase events chronologically, perfect for storytelling or project updates.", link: "/generators/timeline", icon: faTimeline },
    { name: "FAQ Generator", description: "Generate custom FAQs to provide answers to common queries, improving user experience.", link: "/generators/faq", icon: faCircleQuestion },
    { name: "Switch/Toggle Generator", description: "Create custom switches/toggles to enable users to control settings or options intuitively.", link: "/generators/switch", icon: faToggleOn },
    { name: "Background Color Generator", description: "Create custom background color effects for your web elements.", link: "/generators/bg-color", icon: faFillDrip },
    { name: "Div Position Generator", description: "Create custom div positioning for precise layout control.", link: "/generators/div-position", icon: faArrowsToDot },
    { name: "Text Animation Generator", description: "Create custom text animations to bring life to your content.", link: "/generators/text-animation", icon: faTextHeight },
    { name: "Text Gradient Generator", description: "Create custom text colors to enhance readability and style.", link: "/generators/text-gradient", icon: faPalette },
    { name: "Hover Effect Generator", description: "Create custom hover effects to improve interactivity.", link: "/generators/hover-effect", icon: faHandPointer },
    { name: "List Generator", description: "Create custom styled lists for better content organization.", link: "/generators/list", icon: faList },
    { name: "Infinite Items Scroll Generator", description: "Create custom infinite scroll functionality for content-rich pages.", link: "/generators/infinite-scroll", icon: faArrowRightLong },
    { name: "Card Flip Generator", description: "Create custom card flip animations for interactive content reveal.", link: "/generators/card-flip", icon: faRotate },
    { name: "Mouse Follow Generator", description: "Create custom mouse follow effects for interactive cursors.", link: "/generators/mouse-follow", icon: faComputerMouse },
    { name: "Tabs Generator", description: "Create custom tabs for organized content presentation.", link: "/generators/tabs", icon: faFolder },
    { name: "Feedback Generator", description: "Create custom feedback forms or popups to gather user input.", link: "/generators/feedback", icon: faComment },
    { name: "Social Media Buttons Generator", description: "Create custom social media buttons for improved social sharing.", link: "/generators/social-buttons", icon: faShareNodes },
    { name: "Alert/Notification Generator", description: "Create custom alerts and notifications with various styles, colors, and animations.", link: "/generators/alert", icon: faBell },
    { name: "Table Generator", description: "Create customizable tables with options for rows, columns, headers, and styling.", link: "/generators/table", icon: faTable },
    {
        name: 'Stats Generator',
        description: 'Create customizable statistics displays with live preview',
        icon: faChartBar,
        link: '/generators/stats'
    },
];

export const funnyComponents: Component[] = [
    { name: 'Laugh Track', description: 'Add laughter to your app', icon: faLaughSquint, link: '/funny/laugh-track' },
    { name: 'Ghost Cursor', description: 'Spook your users', icon: faGhost, link: '/funny/ghost-cursor' },
    {
        name: 'Impossible Click',
        description: 'A button that refuses to be clicked. Good luck!',
        icon: faMousePointer,
        link: '/funny/impossible-click'
    },
    {
        name: 'Dramatic Typo Corrector',
        description: 'A text input that faints at the sight of a typo',
        icon: faKeyboard,
        link: '/funny/dramatic-typo-corrector'
    },
    {
        name: 'Overenthusiastic Submit',
        description: 'A button that gets WAY too excited about being clicked!',
        icon: faPaperPlane,
        link: '/funny/overenthusiastic-submit'
    },
    // ... other funny components
];