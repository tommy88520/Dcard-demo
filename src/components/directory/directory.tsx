import { useEffect, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './directory.scss';
import { staggerText, handleHover, handleHoverExit } from '~/utils/Animations';

const Directory = forwardRef<HTMLInputElement>(({ post }, ref) => {
  let line1 = useRef(null);
  // const ref: MutableRefObject<HTMLSpanElement | null> = useRef<HTMLSpanElement|null>(null);

  const navigate = useNavigate();

  const onNavigateHandler = (item) => {
    navigate(`/repo/${item}`);
  };
  useEffect(() => {
    staggerText(line1);
  }, []);
  return (
    <div
      ref={ref && ref}
      className='repo-container__box'
      onClick={() => onNavigateHandler(post)}
      aria-hidden
    >
      <h2 className='repo-container__box-border'>
        <span
          onMouseEnter={(e) => handleHover(e)}
          onMouseLeave={(e) => handleHoverExit(e)}
          ref={(el) => (line1 = el)}
        >
          {post}
        </span>
      </h2>
    </div>
  );
});

Directory.displayName = 'Directory';
export default Directory;
