import { AiOutlineFileProtect, AiOutlineSlack } from 'react-icons/ai';
import './Tabs.css';
import { useNavigate } from 'react-router-dom';

export const Tabs = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <div className="tabs">
      <button
        className={`tab ${path === '/identifying' ? 'tab-focus' : ''}`}
        onClick={() => navigate('/identifying')}
      >
        <AiOutlineSlack size={'40'} />
        <span>Skin Condition</span>
      </button>
      <button
        className={`tab ${path === '/checkProduct' ? 'tab-focus' : ''}`}
        onClick={() => navigate('/checkProduct')}
      >
        <AiOutlineFileProtect size={'40'} />
        <span>Product Match</span>
      </button>
    </div>
  );
};
