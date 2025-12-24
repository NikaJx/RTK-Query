import { Path } from '@/common/routing/Routing';
import { useLoginMutation } from '../../api/authApi';

export const Login = () => {
  const [login] = useLoginMutation();

  const loginHandler = () => {
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect;
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`;

    window.open(url, 'oauthPopup', 'width=500, height=600');

    const recieveMessage = (e: MessageEvent) => {
      if (e.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;

      const { code } = e.data;
      if (!code) return;

      window.removeEventListener('message', recieveMessage);
      login({ code, redirectUri, rememberMe: false });
    };

    window.addEventListener('message', recieveMessage);
  };

  return (
    <button type="button" onClick={loginHandler}>
      Login
    </button>
  );
};
