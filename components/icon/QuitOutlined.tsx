
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M297.813 133.12a32 32 0 0 1 31.403 55.765 372.352 372.352 0 0 0-190.165 325.163A372.95 372.95 0 1 0 695.68 189.44a32 32 0 1 1 31.573-55.68 433.074 433.074 0 0 1 41.387 26.71 436.31 436.31 0 0 1 180.31 353.62c0 241.323-195.627 436.95-436.95 436.95S75.05 755.37 75.05 514.133a436.352 436.352 0 0 1 222.72-380.928z"/><path d="M544 74.667v288A21.333 21.333 0 0 1 522.667 384h-21.334A21.333 21.333 0 0 1 480 362.667v-288a21.333 21.333 0 0 1 21.333-21.334h21.334A21.333 21.333 0 0 1 544 74.667z"/></svg>
    </IconWrapper>
);
