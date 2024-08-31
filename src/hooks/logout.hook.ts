import { useResetRecoilState } from 'recoil';
import { usernameState } from '../atoms/username.atom';
import { classificationState } from '../atoms/classification.atom';

export const useLogout = () => {
  const resetUsername = useResetRecoilState(usernameState);
  const resetClassification = useResetRecoilState(classificationState);

  return () => {
    resetClassification();
    resetUsername();
  };
};
