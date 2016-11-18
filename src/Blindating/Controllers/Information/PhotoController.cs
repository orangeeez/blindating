using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blindating.Models;
using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Drawing;
using System.Threading;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreAngular2.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class PhotoController : Controller
    {
        private IHostingEnvironment Environment;
        public IPhotoRepository Photos { get; set; }
        public PhotoController([FromServices] IPhotoRepository photos, IHostingEnvironment environment)
        {
            Environment = environment;
            Photos = photos;
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Photos.GetAll());
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Photos.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getlast")]
        public JsonResult GetLast([FromBody] int userID)
        {
            return new JsonResult(Photos.GetLast(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getlastcount")]
        public JsonResult GetLast([FromBody] dynamic data)
        {
            return new JsonResult(Photos.GetLastCount(data));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Photo photo)
        {
            return new JsonResult(Photos.Add(photo));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("addbyjwt")]
        public async Task<string> AddByJWT()
        {
            Image image;
            var uploader = Request.Headers["Uploader"].ToString();
            var JWT = Request.Cookies["JWT"];
            var relatedPath = "images/users/";
            var filename = Path.GetRandomFileName() + ".jpg";
            var upload = Path.Combine(Environment.WebRootPath, relatedPath);
            foreach (var file in Request.Form.Files)
            {
                using (var fs = new FileStream(Path.Combine(upload, filename), FileMode.Create,
                                                                               FileAccess.ReadWrite,
                                                                               FileShare.ReadWrite))
                {
                    await file.CopyToAsync(fs);
                    image = Image.FromStream(fs);
                }

                return await Photos.AddByJWT(JWT, image, relatedPath + filename, uploader);
            }
            return null;
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Photo photo)
        {
            return new JsonResult(Photos.Update(photo));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Photo photo)
        {
            System.IO.File.Delete(Path.Combine(Environment.WebRootPath, photo.Path));
            return new JsonResult(Photos.Remove(photo));
        }
    }
}
