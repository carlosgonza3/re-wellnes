# Netlify v1.0 release runbook

## 1. Preflight

From the repository root:

```bash
nvm use
npm ci
npm run verify
```

Expected result: the test suite passes and the optimized site is generated in
`build/`.

No application environment variables are required for v1.0. Contact actions
use public `https://wa.me`, Instagram, and `mailto:` links.

## 2. Create the Netlify project

1. Push the release-ready commit to GitHub.
2. In the Netlify team dashboard, choose **Add new project** and then
   **Import an existing project**.
3. Choose GitHub, authorize only the required repository, and select this
   repository.
4. Confirm that Netlify reads the committed configuration:
   - Production branch: `main`
   - Build command: `npm run verify`
   - Publish directory: `build`
   - Base directory: leave empty (repository root)
5. Select **Publish**.
6. Open the generated `*.netlify.app` URL and verify desktop and mobile layouts,
   all four service cards, and the WhatsApp, email, and Instagram links.

## 3. Recommended DNS option

Use **Netlify DNS** for this project unless the domain already has a complex DNS
zone managed at GoDaddy or another provider. It gives the apex domain direct
Netlify CDN routing, automatic wildcard TLS, and one control plane for the site
and its DNS.

Before changing nameservers, inventory every existing GoDaddy record. In
particular, copy all `MX`, `TXT` (SPF, DKIM, DMARC, verification), `CNAME`, `A`,
`AAAA`, `CAA`, and `SRV` records that are still needed. A nameserver change makes
Netlify authoritative; records left only at GoDaddy stop being active.

## 4. Connect a GoDaddy domain with Netlify DNS

Replace `<your-domain.com>` with the client's actual domain. The four Netlify
nameservers are unique to the DNS zone; always copy the values shown in the
Netlify dashboard instead of using nameservers from another project.

1. In Netlify, open the project and select **Domain management**.
2. Select **Add a domain** > **Add a domain you already own**.
3. Enter `<your-domain.com>`, select **Verify**, and confirm **Add domain**.
4. Next to the domain, select **Options** > **Set up Netlify DNS** and complete
   the prompts.
5. Open the Netlify team dashboard, select **DNS**, open the domain, and copy the
   four values in **Name servers**.
6. Before delegation, recreate every required record from the GoDaddy zone in
   the Netlify DNS zone. Do not continue until email and third-party validation
   records have been copied.
7. In GoDaddy, open **Domain Portfolio** and select the domain.
8. Select **DNS** > **Nameservers**.
9. Choose **I'll use my own nameservers**.
10. Enter the four Netlify nameservers exactly as displayed by Netlify.
11. Select **Save** > **Continue** and complete GoDaddy identity verification if
    requested.
12. Wait for delegation to propagate. Netlify documents up to 24 hours;
    GoDaddy notes that global propagation can take up to 48 hours.
13. Back in Netlify, confirm that **Domain management** reports the domain as
    verified and that the apex domain and `www` both resolve.
14. Choose the desired **Primary domain** (normally the apex domain for this
    brand). Netlify will redirect the alias to the primary domain.
15. Under **Domain management** > **HTTPS**, confirm that Netlify has provisioned
    its managed certificate. Test both `https://<your-domain.com>` and
    `https://www.<your-domain.com>` in a private browser window.

## 5. Alternative: keep DNS at GoDaddy

Use this only if the existing GoDaddy zone has many records or another party
must continue managing DNS there.

1. Add the custom domain in Netlify as described above and choose an external
   DNS provider.
2. In GoDaddy DNS, set the apex (`@`) `A` record to `75.2.60.5`.
3. Set the `www` `CNAME` record to the project's generated
   `<site-name>.netlify.app` hostname.
4. Remove conflicting apex `A`/`AAAA` records and conflicting `www` records.
   Leave unrelated email and verification records intact.
5. Use **Pending DNS verification** in Netlify for the customized values and
   status. Once verified, confirm HTTPS and both hostnames.

With external DNS, Netlify recommends a subdomain such as `www` as the primary
domain because the apex uses a load-balancer record instead of direct DNS
routing. This tradeoff is the main reason Netlify DNS is preferable for this
site.

## 6. Release and rollback

1. After the `*.netlify.app` smoke test passes, connect the domain.
2. Verify production on a phone and desktop before announcing the launch.
3. In Netlify **Deploys**, keep the previous successful deploy available. If a
   regression is found, use Netlify's publish/restore action on the previous
   deploy while a fix is prepared.
4. Create the Git tag `v1.0.0` only after the production custom domain passes the
   final checks.

## 7. Known maintenance item

`react-scripts` 5 is a legacy build dependency and its transitive build/test
toolchain currently produces npm audit advisories. The packages are used only
to compile and test the site; Netlify publishes the static files in `build/`,
not `node_modules`. Do not run `npm audit fix --force`, because npm's proposed
forced resolution is breaking. Plan a separate Create React App-to-Vite
migration so the build toolchain can be modernized without mixing that larger
change into the v1.0 launch.

## Official references

- [Deploy from a repository](https://docs.netlify.com/start/quickstarts/deploy-from-repository/)
- [Set up Netlify DNS](https://docs.netlify.com/manage/domains/set-up-netlify-dns/)
- [Configure external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)
- [Netlify HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)
- [Change GoDaddy nameservers](https://www.godaddy.com/help/change-my-domain-nameservers-664)
