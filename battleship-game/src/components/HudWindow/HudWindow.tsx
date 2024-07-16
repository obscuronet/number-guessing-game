import { ReactNode } from 'react';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedText from '@/components/AnimatedText/AnimatedText';

import styles from './styles.module.scss';

type Props = {
    children?: ReactNode;
    footerContent?: ReactNode;
    headerTitle: string;
    isOpen?: boolean;
    closedContent?: ReactNode;
    speed?: number;
    modalMode?: boolean;
    transparentOverlay?: boolean;
};

export default function HudWindow({
    children,
    footerContent,
    headerTitle,
    isOpen = true,
    closedContent,
    speed = 1,
    modalMode = false,
    transparentOverlay = false,
}: Props) {
    const topDecorationAnimation = {
        initial: { width: 0, height: 0 },
        animate: { width: '80%', height: '80%' },
        exit: { opacity: 0 },
        transition: { duration: 1 * speed },
    };
    const bottomDecorationAnimation = {
        initial: { width: 0, height: 0 },
        animate: { width: '50px', height: '50px' },
        exit: { opacity: 0 },
        transition: { duration: 1 * speed },
    };

    const headerAnimation = {
        initial: { opacity: 0, width: 0 },
        animate: { opacity: 1, width: '100%' },
        exit: { opacity: 0 },
        transition: { delay: 1 * speed, duration: 1 * speed },
    };

    const contentAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { delay: 2 * speed, duration: 1 * speed },
    };

    const footerAnimation = {
        initial: { opacity: 0, width: 0 },
        animate: { opacity: 1, width: '100%' },
        exit: { opacity: 0 },
        transition: { delay: 1 * speed, duration: 1 * speed },
    };

    const footerContentAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { delay: 3 * speed, duration: 1 * speed },
    };

    const closedScreenAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { delay: 3 * speed, duration: 1 * speed },
    };

    const modalClass = classNames({
        'absolute inset-0 flex justify-center items-center  -mt-40': modalMode,
        'bg-translucentBg': !transparentOverlay,
    });

    return (
        <AnimatePresence>
            <div className={modalClass}>
                <section className="relative p-2 backdrop-blur bg-translucentBg">
                    <motion.div {...topDecorationAnimation} className={styles.topLeftDecoration} />
                    <motion.div {...headerAnimation}>
                        <header className={`px-2 mb-2 bg-white text-black ${styles.glow}`}>
                            <AnimatedText text={headerTitle} delay={2 * speed} speed={0.1} />
                        </header>
                    </motion.div>

                    {!isOpen && <motion.div {...closedScreenAnimation}>{closedContent}</motion.div>}

                    {isOpen && <motion.div {...contentAnimation}>{children}</motion.div>}

                    {footerContent && isOpen && (
                        <>
                            <motion.footer
                                {...footerAnimation}
                                className={`p-2 mt-2 bg-white text-black ${styles.glow}`}
                            >
                                <motion.div {...footerContentAnimation}>{footerContent}</motion.div>
                            </motion.footer>
                            <motion.div
                                {...bottomDecorationAnimation}
                                className={styles.bottomRightDecoration}
                            />
                        </>
                    )}
                </section>
            </div>
        </AnimatePresence>
    );
}