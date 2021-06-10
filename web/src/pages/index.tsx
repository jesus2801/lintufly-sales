import Link from 'next/link';

const IndexPage = () => (
  <div>
    <h1>Hello Next.js 👋</h1>

    <Link href="/auth/register">Regsitro</Link>
    <Link href="/auth/login">Login</Link>
  </div>
);

export default IndexPage;
