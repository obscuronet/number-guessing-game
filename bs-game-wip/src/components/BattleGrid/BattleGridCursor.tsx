import { useRef } from 'react';

import { Container, Graphics, useTick } from '@pixi/react';

import createHexagon from '@/helpers/createHexagon';
import { HEX_HEIGHT, HEX_WIDTH } from '@/lib/constants';
import { useContractStore } from '@/stores/contractStore';
import { useGameStore } from '@/stores/gameStore';

const hexagon = createHexagon(HEX_WIDTH, HEX_HEIGHT);

export default function BattleGridCursor() {
    const [[x, y], hoveredCell] = useGameStore((state) => [state.mousePosition, state.hoveredCell]);
    const guessState = useContractStore((state) => state.guessState);
    const isLoadingState = guessState !== 'IDLE';
    const shapeRef = useRef(null);
    const timeRef = useRef(0);

    useTick((delta) => {
        if (shapeRef.current) {
            timeRef.current += delta;
            const scaleSpeed = 0.1;
            const rotationSpeed = 1;
            const maxScale = 1;
            const minScale = isLoadingState && guessState !== 'ERROR' ? 0.5 : 0.95;
            const scaleRange = (maxScale - minScale) / 2;
            const midScale = (maxScale + minScale) / 2;
            const newScale = midScale + Math.sin(timeRef.current * scaleSpeed) * scaleRange;

            shapeRef.current.scale.set(newScale);

            if (isLoadingState && guessState !== 'ERROR') {
                shapeRef.current.rotation += timeRef.current * rotationSpeed;
            } else {
                shapeRef.current.rotation = 0;
            }
        }
    });

    if (!hoveredCell) {
        return null;
    }

    return (
        <Container>
            <Graphics
                ref={shapeRef}
                draw={(g) => {
                    g.position.set(x, y);
                    g.clear();
                    g.lineStyle(1, guessState !== 'ERROR' ? 0xffffff : 0xdc2626, 1);
                    g.drawPolygon(hexagon);
                    g.endFill();
                }}
            />
        </Container>
    );
}
