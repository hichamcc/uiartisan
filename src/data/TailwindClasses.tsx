export const TailwindClasses: any = {
    colors: [
        'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
        'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
        'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
    ],
    colorShades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],

    textSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],

    fontWeights: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],

    spacing: ['px', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'],

    sizing: {
        width: ['auto', 'px', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '2/6', '3/6', '4/6', '5/6', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', 'full', 'screen', 'min', 'max', 'fit'],
        height: ['auto', 'px', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '2/6', '3/6', '4/6', '5/6', 'full', 'screen', 'min', 'max', 'fit'],
    },

    opacity: ['0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100'],

    shadows: ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'],

    borderRadius: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],

    borderWidths: ['0', '2', '4', '8'],

    transitions: {
        property: ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'],
        duration: ['75', '100', '150', '200', '300', '500', '700', '1000'],
        timingFunction: ['linear', 'in', 'out', 'in-out'],
    },

    transforms: {
        scale: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150'],
        rotate: ['0', '1', '2', '3', '6', '12', '45', '90', '180'],
        translate: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'],
    },

    flexbox: {
        flex: ['1', 'auto', 'initial', 'none'],
        flexDirection: ['row', 'row-reverse', 'col', 'col-reverse'],
        flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
        alignItems: ['start', 'end', 'center', 'baseline', 'stretch'],
        justifyContent: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },

    grid: {
        gridCols: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
        gridRows: ['1', '2', '3', '4', '5', '6', 'none'],
        gap: ['0', '1', '2', '4', '8', '16', '32', '64'],
    },

    effects: {
        hover: 'hover:',
        focus: 'focus:',
        active: 'active:',
        group: 'group-hover:',
        disabled: 'disabled:',
    },

    responsive: {
        sm: 'sm:',
        md: 'md:',
        lg: 'lg:',
        xl: 'xl:',
        '2xl': '2xl:',
    },

    darkMode: 'dark:',
};

export const generateColorClass = (type: string, color: string, shade: string) => {
    return `${type}-${color}-${shade}`;
};

export const generateTextSizeClass = (size: string) => {
    return `text-${size}`;
};

export const generateFontWeightClass = (weight: string) => {
    return `font-${weight}`;
};

export const generateSpacingClass = (type: 'p' | 'm', direction: 't' | 'r' | 'b' | 'l' | 'x' | 'y' | '', size: string) => {
    return `${type}${direction}-${size}`;
};

export const generateWidthClass = (size: string) => {
    return `w-${size}`;
};

export const generateHeightClass = (size: string) => {
    return `h-${size}`;
};

export const generateOpacityClass = (value: string) => {
    return `opacity-${value}`;
};

export const generateShadowClass = (size: string) => {
    return `shadow-${size}`;
};

export const generateBorderRadiusClass = (size: string) => {
    return `rounded-${size}`;
};

export const generateBorderWidthClass = (size: string) => {
    return `border-${size}`;
};

export const generateTransitionClass = (property: string, duration: string, timing: string) => {
    return `transition-${property} duration-${duration} ease-${timing}`;
};

export const generateTransformClass = (type: 'scale' | 'rotate' | 'translate', value: string) => {
    return `${type}-${value}`;
};

export const generateFlexClass = (property: string, value: string) => {
    return `${property}-${value}`;
};

export const generateGridClass = (type: 'cols' | 'rows', value: string) => {
    return `grid-${type}-${value}`;
};

export const generateGapClass = (value: string) => {
    return `gap-${value}`;
};

export const generateResponsiveClass = (breakpoint: string, className: string) => {
    return `${TailwindClasses.responsive[breakpoint]}${className}`;
};

export const generateEffectClass = (effect: string, className: string) => {
    return `${TailwindClasses.effects[effect]}${className}`;
};

export const generateDarkModeClass = (className: string) => {
    return `${TailwindClasses.darkMode}${className}`;
};