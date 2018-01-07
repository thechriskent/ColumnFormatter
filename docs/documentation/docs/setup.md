# Setup & Configuration

## Installation

To get started, you'll need to upload the web part package to your app (or site) catalog. This will require administrator rights so you may have to hand it off to someone in IT for these steps.

Upload or drag and drop the package to the catalog and then trust it. The package is designed to utilize tenant wide deployment (this simplifies having to add it to every site). The assets are also bundled in the package (so separate CDN deployment isn't required). Additional details and examples of this process can be found [here] (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog).

## Adding it to a Site

You can add Custom Formatter to a page (classic or modern) just as you would any other webpart.

>Note -If tenant deployment wasn't enabled, then the app will have to be added to the site like any other app.

## Configuration

The only configuration you might want to do is adjust the height to make it easier to use. By default, Column Formatter attempts to minimize it's height requirements to be sensitive to other page contents. However, you can adjust this to be taller (this makes editing much easier) by adjusting the Height property in the webpart's property toolpane (just choose to edit the webpart's properties).

## Next Steps

Now it's time to start using Column Formatter! Check out the [Getting Started](./getting-started.md) section.

![](https://telemetry.sharepointpnp.com/sp-dev-solutions/ColumnFormatter/wiki/Setup)
