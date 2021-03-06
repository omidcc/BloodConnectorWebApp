﻿using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using BloodConnector.WebAPI.App_Start;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.WebApi;
using Newtonsoft.Json.Serialization;

namespace BloodConnector.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            UnityConfig.RegisterTypes(container);
            //Set the unity container as the default dependency resolver
            config.DependencyResolver = new UnityHierarchicalDependencyResolver(container);

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
