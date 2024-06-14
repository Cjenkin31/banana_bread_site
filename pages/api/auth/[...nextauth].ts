// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      authorization: {
        url: 'https://discord.com/oauth2/authorize',
        params: {
          client_id: process.env.DISCORD_CLIENT_ID,
          response_type: 'code',
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/discord`,
          scope: 'identify guilds',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
