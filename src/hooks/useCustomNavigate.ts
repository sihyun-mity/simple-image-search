import { NavigateOptions, To, useNavigate } from 'react-router-dom';

export default function useCustomNavigate() {
  const navigate = useNavigate();
  const sendTo = (to: To, options?: NavigateOptions) =>
    navigate(to && `/simple-image-search${to}`, options && { ...options });

  return sendTo;
}
